import { markRaw, ref, type Component } from "vue";

type ModalState = {
    component: Component | null;
    props: Record<string, any>;
};

const state = ref<ModalState>({
    component: null,
    props: {},
});

export function useModal() {
    function show(component: Component, props: Record<string, any> = {}) {
        state.value = { component: markRaw(component), props };
    }

    function hide() {
        state.value = { component: null, props: {} };
    }

    return { state, show, hide };
}