import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { SuspensePreloader } from '@/ui-components'

const Profile = dynamic(() => import('./profile'), {
  loading: () => <SuspensePreloader />,
})

type GenerateMetadataProps = {
  params: { locale: string }
}

export const generateMetadata = async ({ params }: GenerateMetadataProps) => {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'metadata.profile',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default Profile
