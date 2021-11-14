import rickRollImage from "./lib/image/rick.gif"
import "./app.css"
import config from "./lib/config";


export const App = () => {

    async function formSend() {
        const title = document.getElementById("title").value
        const description = document.getElementById("description").value
        const imageURL = document.getElementById("imageURL").value

        if (title !== "" && title !== null && title.length <= 45 && description.length <= 155) {
            const body = JSON.stringify({"title": title, "description": description, "imageURL": imageURL})


            fetch(config.apiEndpoint + "/prank",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: body
                }).then(function (response) {
                return response.json();
                })
                .then(function (myJson) {
                    console.log(JSON.stringify(myJson));
                    window.location.href = "/data/" + myJson.uid;
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
                <img className="rickRolIMG" src={rickRollImage} alt="rickRollIMG"/>
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