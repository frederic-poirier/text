import { Layout } from "../components/layout";

export function Home() {
    return (
        <Layout>
            <h1>Welcome home</h1>
            <p>Here you can see the recent text you opened</p>
            <form action="/fetch" method="post">
                <label for="input-url">Fetch content</label>
                <input type="url" id="input-url" name="url" />
                <button>fetch</button>
            </form>
        </Layout>
    );
}
