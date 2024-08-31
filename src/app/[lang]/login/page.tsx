import SuspensePreloader from '@/ui-components/SuspensePreloader/SuspensePreloader'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'

const LoginForm = dynamic(() => import('./login-form'), {
  loading: () => <SuspensePreloader fullView />,
})

type GenerateMetadataProps = {
  params: { locale: string }
}

export const generateMetadata = async ({ params }: GenerateMetadataProps) => {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'metadata.login',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default LoginForm
