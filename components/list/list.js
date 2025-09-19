export const registerList = () =>
    customElements.define(
        "x-list",
        class extends HTMLElement {
            connectedCallback() {
                this.innerText = "Loading...";

                fetch(import.meta.resolve(this.getAttribute("file")))
                    .then(response => response.text())
                    .then(response => {
                        let data = response.trim().split("\n");

                        if (data.length) {
                            if (this.getAttribute("limit")) {
                                data = data.slice(0, this.getAttribute("limit"))
                            }

                            this.innerHTML = `
                                <ul>
                                    ${data.map(item => {
                                        const [name, link] = item.split(",");
                                        return `
                                            <li><a href="${link}">${name}</a></li>
                                        `
                                    }).join("")}
                                </ul>
                            `
                        } else {
                            this.innerHTML = "Something went wrong..."
                        }
                    })
                    .catch(e => this.innerText = e.message)
            }
        }
    )
