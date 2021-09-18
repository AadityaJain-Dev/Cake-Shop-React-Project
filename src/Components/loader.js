export const Loader = () => {


    return <div style={{
        'position': 'absolute',
        'left': '0px',
        'top': '0px',
        'z-index': '999999',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    }} className="h-100 w-100 bg-light">

        <div class="spinner-border" role="status">
            <span class="sr-only"></span>
        </div>

    </div>

}