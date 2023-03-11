const Buy = ({ state }) => {

    const buyChai = async (event) => {
        event.preventDefault();
        const { contract } = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;

        console.log(name, message, contract);
    };

    return (
        <>
            <form onSubmit={buyChai}>
                <label>Name</label>
                <input type="text" id="name" placeholder="Enter your name"></input>
                <label>Message</label>
                <input
                    type="text"
                    id="message"
                    placeholder="Enter your message"
                ></input>
                <button type="submit">Pay</button>
            </form>
        </>
    );
};
export default Buy;