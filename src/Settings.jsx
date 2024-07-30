export default function Settings() {
    return (
        <>
            <div className="modal" id="settingsModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content bg-black text-light">
                        <div class="modal-header border-dark">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Settings</h1>
                        </div>
                        <div class="modal-body border-dark">
                            Settings coming soon
                        </div>
                        <div class="modal-footer border-dark">
                            <button type="button" class="btn btn-dark border-0 rounded-1" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark border-0 rounded-1">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}