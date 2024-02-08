import { createApi } from "unsplash-js";

export default defineNuxtPlugin(async (nuxtApp) => {
    // const unsplashAccessKey = await useRuntimeConfig().unsplashAccessKey as string;
    // unsplashAccessKey is available but applied for some reason
    const unsplash = createApi({
        accessKey: 'gknjc3O_h6wauZ8lRPWzWr_YgDJogVGLQcM38rhkyoA',
        fetch: fetch,
    });
    nuxtApp.unsplash = unsplash
});