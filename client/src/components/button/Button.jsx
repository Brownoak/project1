const Button = (props) => {
    return (
        <div className="py-4 w-100">
            <button
                type="submit"
                className="btn w-100 text-center text-white block mt-2 btn_color">
                {props.title}
            </button>
        </div>
    )
}

export default Button