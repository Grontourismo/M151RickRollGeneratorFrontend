import rickRollImage from "./lib/image/rick.gif"
import "./app.css"
import config from "./lib/config";


export const App = () => {

    async function formSend() {
        const title = document.getElementById("title").value
        const description = document.getElementById("description").value
        const imageURL = document.getElementById("imageURL").value

        if (title !== "" && title !== null) {
            fetch(config.apiEndpoint + "/prank",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: "{" +
                        "title:" + title + "," +
                        "description:" + description + "," +
                        "imageURL:" + imageURL +
                        "}"
                })
                .then(function (res) {
                    switch (res.status) {
                        case 200 || 201:
                            window.location.href = "/data/" + res[0].uid;
                            break;
                        default:
                            document.getElementById("errorMsg").innerText = "Could not create";
                            break;
                    }
                })
                .catch((error) => {
                    document.getElementById("errorMsg").innerText = "Could not create";
                })
        } else {
            document.getElementById("errorMsg").innerText = "Title is Required";
        }
    }

    return (
        <div>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                <img className="rickRolIMG" src={rickRollImage}/>
            </a>
            <div className="text-center">
                <h2 className="title">
                    MAKE YOUR OWN RICKROLLS
                </h2>
                <input id="title" className="inputTitle" placeholder="Title (Max 45 Characters) Required" required
                       name="title"/>
                <br/>
                <textarea id="description" className="inputDescription" placeholder="Description (Max 155 Characters)"
                          name="description"/>
                <br/>
                <input id="imageURL" className="inputImageURL" placeholder="Image URL" name="imageURL"/>
                <br/>
                <p className="errorMsg" id="errorMsg"/>
                <br/>
                <button onClick={formSend}>Senden</button>
            </div>
        </div>
    );
}