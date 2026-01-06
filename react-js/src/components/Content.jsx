import './Content.css'

const Content = () => {
    return (
        <>

            <div id='MainContent'>
                <Card1 name="Rehann Raja " />
                <Card1 name="Alfaiz Sunni" />
                <Card1 name="Hasnain Makati" />
                <Card1 name="Abbas Sorthiya" />
            </div>
        </>
    )
}



const Card1 = ({ name }) => {
    return (

        <div id='card'>
            <h2>{name}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptate vitae </p>
            <button id='Btn'>Submit</button>
        </div>

    )
}




export default Content
