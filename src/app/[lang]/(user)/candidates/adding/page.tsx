import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { SuspensePreloader } from '@/ui-components'

const CandidateAdding = dynamic(() => import('./candidate-adding'), {
  loading: () => <SuspensePreloader />,
})

type GenerateMetadataProps = {
  params: { locale: string }
}

export const generateMetadata = async ({ params }: GenerateMetadataProps) => {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'metadata.candidate-adding',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default CandidateAdding
