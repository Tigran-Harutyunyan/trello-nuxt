import { useClerk } from 'vue-clerk';

export default defineNuxtRouteMiddleware((to, from) => {

    const nuxtApp = useNuxtApp();

    const clerk = useClerk();
    if (process.server) {


    }

    if (process.client && clerk.loaded) {


    }

});

