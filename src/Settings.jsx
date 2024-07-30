export default function Settings() {
    return (
        <>
            <div className="modal" id="settingsModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content bg-black text-light">
                        <div class="modal-header border-dark">
                            <div className="container">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Settings</h1>
                            </div>
                        </div>
                        <div class="modal-body border-dark">
                            <div className="container">
                                Settings coming soon
                            </div>
                        </div>
                        <div class="modal-footer border-dark">
                            <div className="container d-flex align-items-center m-auto">
                                <button type="button" class="btn btn-dark ms-auto me-2 border-0 rounded-1" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-dark border-0 rounded-1">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}