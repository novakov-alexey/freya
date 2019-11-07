package io.github.novakovalexey.k8soperator4s.common

import cats.effect.{Effect, Sync}
import io.fabric8.kubernetes.api.model.ConfigMap
import io.fabric8.kubernetes.api.model.apiextensions.CustomResourceDefinition
import io.fabric8.kubernetes.client.KubernetesClient
import io.github.novakovalexey.k8soperator4s._
import io.github.novakovalexey.k8soperator4s.common.AbstractOperator.getKind
import io.github.novakovalexey.k8soperator4s.common.crd.{CrdDeployer, InfoClass, InfoClassDoneable, InfoList}
import io.github.novakovalexey.k8soperator4s.resource.{ConfigMapParser, CrdParser, Labels}

import scala.jdk.CollectionConverters._
import scala.util.Try

object AbstractOperator {
  def getKind[T](cfg: OperatorCfg[T]): String =
    cfg.customKind.getOrElse(cfg.forKind.getSimpleName)
}

sealed abstract class AbstractOperator[F[_]: Effect, T](
  val client: KubernetesClient,
  val cfg: OperatorCfg[T],
  val isOpenShift: Boolean
) {

  val kind: String = getKind[T](cfg)
  val clientNamespace: Namespaces = Namespace(client.getNamespace)
}

object ConfigMapOperator {
  def convertCm[T](kind: Class[T])(cm: ConfigMap): (T, Metadata) =
    ConfigMapParser.parseCM(kind, cm)
}

class ConfigMapOperator[F[_]: Effect, T](cfg: ConfigMapConfig[T], client: KubernetesClient, isOpenShift: Boolean)
    extends AbstractOperator[F, T](client, cfg, isOpenShift) {

  val selector: Map[String, String] = Labels.forKind(getKind[T](cfg), cfg.prefix)

  def currentConfigMaps: Map[Metadata, T] = {
    val cms = {
      val _cms = client.configMaps
      if (AllNamespaces == cfg.namespace) _cms.inAnyNamespace
      else _cms.inNamespace(cfg.namespace.value)
    }

    cms
      .withLabels(selector.asJava)
      .list
      .getItems
      .asScala
      .toList
      // ignore this CM, if it is not convertible
      .flatMap(item => Try(Option(ConfigMapOperator.convertCm(cfg.forKind)(item))).getOrElse(None))
      .map { case (entity, meta) => meta -> entity }
      .toMap
  }
}

object CrdOperator {

  def deployCrd[F[_]: Sync, T](
    client: KubernetesClient,
    cfg: CrdConfig[T],
    isOpenShift: Boolean
  ): F[CustomResourceDefinition] = CrdDeployer.initCrds[F, T](
    client,
    cfg.prefix,
    getKind[T](cfg),
    cfg.shortNames,
    cfg.pluralName,
    cfg.additionalPrinterColumns,
    cfg.forKind,
    isOpenShift
  )

  def convertCr[T](kind: Class[T])(info: InfoClass[_]): (T, Metadata) =
    (CrdParser.parse(kind, info), Metadata(info.getMetadata.getName, info.getMetadata.getNamespace))
}

class CrdOperator[F[_]: Effect, T](
  cfg: CrdConfig[T],
  client: KubernetesClient,
  isOpenShift: Boolean,
  crd: CustomResourceDefinition
) extends AbstractOperator[F, T](client, cfg, isOpenShift) {

  def currentResources: Map[Metadata, T] = {
    val crds = {
      val _crds =
        client.customResources(crd, classOf[InfoClass[T]], classOf[InfoList[T]], classOf[InfoClassDoneable[T]])
      if (AllNamespaces == cfg.namespace) _crds.inAnyNamespace else _crds.inNamespace(cfg.namespace.value)
    }

    crds.list.getItems.asScala.toList
    // ignore this CRD, if it is not convertible
      .flatMap(i => Try(Option(CrdOperator.convertCr(cfg.forKind)(i))).getOrElse(None))
      .map { case (entity, meta) => meta -> entity }
      .toMap
  }
}
