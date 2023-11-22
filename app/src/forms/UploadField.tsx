import Uploady from "@rpldy/uploady";


type UploadFieldProps = {};
export default function UploadField(props: UploadFieldProps) {
    return (
        <Uploady debug
                 destination={{url: "[upload-url]"}}>
            <div className="App">
                <h1>Hello React Uploady</h1>
                <br/>
            </div>
        </Uploady>
    );
}

