// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/google-fonts', '@pinia/nuxt', '@nuxt/image'],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg', href: '/logo.svg' }
      ],
    }
  },
  build: {
    transpile: ['vue-clerk', '@clerk/clerk-js', "@nuxt/image"],
  },
  runtimeConfig: {
    public: {
      clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
  },
  googleFonts: {
    subsets: 'latin',
    families: {
      Poppins: {
        wght: [200, 300, 400, 500, 600, 700, 800, 900],
      },
    }
  },
  image: {

  }
})  