import SuspensePreloader from '@/ui-components/SuspensePreloader/SuspensePreloader'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'

const Dashboard = dynamic(() => import('./dashboard'), {
  loading: () => <SuspensePreloader />,
})

type GenerateMetadataProps = {
  params: { locale: string }
}

export const generateMetadata = async ({ params }: GenerateMetadataProps) => {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'metadata.dashboard',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default Dashboard
