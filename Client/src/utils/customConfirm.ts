import Swap from "sweetalert2";

function customConfirm(onConfirm: any, title: string = "Are you sure ?", confirmButtonText: string = "Delete") {

    Swap.fire({ title, confirmButtonText, icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33' })
        .then(result => {
            if (result.isConfirmed) {
                onConfirm();
            }
        });
}

export default customConfirm;
