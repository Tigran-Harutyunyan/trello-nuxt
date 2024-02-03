import { useClerk } from 'vue-clerk';

export default defineNuxtRouteMiddleware((to, from) => {

    const nuxtApp = useNuxtApp();

    const clerk = useClerk();

    // On server, check if the user isn't authenticated
    // and redirect to /sign-in. 
    if (process.server) {

        const auth = nuxtApp.ssrContext?.event.context.auth;
        const userId = auth?.userId;
        const orgId = auth?.orgId;


        if (to.path === '/') {
            console.log('case 1', userId);

            let path = "/select-org";

            // if (orgId) {
            //     path = `/organization/${orgId}`
            // }

            return navigateTo(path);
        }

        if (!userId) {
            console.log('case 2', to.path)

            return navigateTo(to.path === '/' ? '/' : '/sign-in');
        }

        if (userId && !orgId && to.path !== "/select-org") {
            console.log('case 3')
            return navigateTo('/select-org')
        }

    }


    // On client, check if clerk is loaded and if user isn't authenticated
    // and redirect to / sign-in. 

    if (process.client && clerk.loaded) {
        if (!clerk.user?.id) {
            console.log('---- client 1 -----')
            return navigateTo('/');
        }

        if (clerk.user?.id) {
            const orgId = clerk?.organization?.id;
            console.log('---- client 2 -----')
            let path = "/select-org";

            console.log(from, to)

            if (orgId && (!from.params?.organizationId)) {
                path = `/organization/${orgId}`;
                return navigateTo(path);
            }


        }
    }

});

