import './BodyStyles/Spinner.css'

export const spinner = (val) => {

    if (val) {
        return (
            <div className="outer">
                <div className="spinner-border" style={{ width: '5rem', height: '5rem' }} role="status">
                    <span className="sr-only"></span>
                </div>

            </div>
        )
    }
    else return <div></div>


}

