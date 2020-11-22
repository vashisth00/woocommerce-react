import Head from 'next/head';
import Header from './Header';
const Layout =(props) => {
    return(
        <div>
            <Head>
                <title>ReactJS Woo</title>
                <link rel="stylesheet" href="https://bootswatch.com/3/superhero/bootstrap.min.css"></link>
            </Head>
            <Header></Header>
            {props.children}
        </div>
    )
};

export default Layout;