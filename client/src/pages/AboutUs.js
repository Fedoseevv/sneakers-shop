import './AboutUs.css'
// import AppHeader from '../app-header'

const AboutUs = () => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Author<br/>
                            Fedoseev Sergey<br/>
                            Group: M3O-310B-18<br/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Front end: React</td>
                    </tr>
                    <tr>
                        <td>Back end: Node, express</td>
                    </tr>
                    <tr>
                        <td>Database: MongoDB</td>
                    </tr>
                    <tr>
                        <td>Code Editor: VS Code</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default AboutUs;