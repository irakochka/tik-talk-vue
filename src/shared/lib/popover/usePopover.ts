import { markRaw, ref, type Component } from "vue";

type PopoverState = {
    component: Component | null;
    props: Record<string, any>;
    anchorEl: HTMLElement | null;
    offset: number;
};

const state = ref<PopoverState>({
    component: null,
    props: {},
    anchorEl: null,
    offset: 8,
});

export function usePopover() {
    function show(component: Component, anchorEl: HTMLElement, props: Record<string, any> = {}, offset = 8) {
        state.value = {
            component: markRaw(component),
            props,
            anchorEl,
            offset,
        };
    }

    function hide() {
        state.value = { component: null, props: {}, anchorEl: null, offset: 8 };
    }

    return { state, show, hide };
}