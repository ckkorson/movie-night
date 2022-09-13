function genre () {
    return (
        <div>
            <h2 class="header">Choose a Genre</h2>
            <div class="container subGenres">
                <div class="subGenres-col">
                    <div class="subGenres-item">
                        <input id="Hardcover Fiction" type="checkbox" />
                        <label for="Hardcover Fiction">Fiction</label>
                    </div>
                    <div class="subGenres-item">
                        <input id="Hardcover Nonfiction" type="checkbox" />
                        <label for="Hardcover Nonfiction">Nonfiction</label>
                    </div>
                    <div class="subGenres-item">
                        <input id="Graphic Books and Manga" type="checkbox" />
                        <label for="Graphic Books and Manga">Graphic Books and Manga</label>
                    </div>
                </div>
                <div class="subGenres-col">
                    <div class="subGenres-item">
                        <input id="Young Adult" type="checkbox" />
                        <label for="Young Adult">Young Adult</label>
                    </div>
                    <div class="subGenres-item">
                        <input id="Business" type="checkbox" />
                        <label for="Business">Business</label>
                    </div>
                    <div class="subGenres-item">
                        <input id="Crime" type="checkbox" />
                        <label for="Crime">Crime</label>
                    </div>
                </div>
                <div class="subGenres-col">
                    <div class="subGenres-item">
                        <input id="Science" type="checkbox" />
                        <label for="Science">Science</label>
                    </div>
                    <div class="subGenres-item">
                        <input id="Sports" type="checkbox" />
                        <label for="Sports">Sports</label>
                    </div>
                    <div class="subGenres-item">
                        <input id="Travel" type="checkbox" />
                        <label for="Travel">Travel</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default genre;