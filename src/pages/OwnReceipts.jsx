

export default function OwnReceipt(){
    const token= localStorage.getItem('token')
    return(
        <div className="container py-4">
            <div className="mb-3">
                {token ? (
                    <form className="d-flex gap-2"></form>
                ) : (
                    <div className="alert alert-secondary">
                        A feltöltéshez be kell jelentkezni!
                    </div>
                )} 
            </div>
        </div>
    )
}