import Vue from "vue";

export default function (options = {}) {
    return Vue.swal({
        icon: 'warning',
        title: 'Ви впевнені?',
        buttonsStyling: false,
        reverseButtons: true,
        showCancelButton: true,
        ...options,
    });
}
