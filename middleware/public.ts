import { useClerk } from 'vue-clerk';
export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp();
    const { getOrganizationMemberships } = useClerk();
    const clerk = useClerk();

    if (process.server) {
        const auth = nuxtApp.ssrContext?.event.context.auth;
        const userId = auth?.userId;
        const orgId = auth?.orgId;

        if (userId && !orgId && to.path !== "/select-org") {
            return navigateTo('/select-org')
        }

        if (userId && orgId) {
            return navigateTo(`/organization/${orgId}`);
        }
    }

    await getOrganizationMemberships();

    if (process.client && clerk.loaded) {

        if (clerk.user?.id) {
            const orgId = clerk?.organization?.id;
            let path = "/select-org";

            if (orgId) {
                path = `/organization/${orgId}`;
                return navigateTo(path);
            }
        }
    }
});

