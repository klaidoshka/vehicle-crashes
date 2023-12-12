import ImageDatabaseModel from '../../assets/image/background.png';

const HomePage = () => {
    return (
        <div
            className='d-flex justify-content-center align-items-center container-fluid h-100 w-100'
            style={{
                backgroundImage: `url(${ImageDatabaseModel})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
            }}
        >
            <div
                className='d-flex justify-content-center align-items-center flex-column h-75 w-75'
                style={{
                    backgroundColor: "rgba(255, 243, 205, 0.7)",
                    borderRadius: "50px",
                    padding: "10px"
                }}
            >
                <div className='col-12 d-flex flex-column justify-content-center align-items-center text-dark'>
                    <h1
                        style={{
                            fontWeight: "bold",
                            fontSize: 100
                        }}
                    >
                        Crevah
                    </h1>

                    <p
                        className='w-25 text-center'
                        style={{
                            fontWeight: "bold",
                            fontSize: 16
                        }}
                    >
                        This is a web application that allows users to view and edit vehicle crashes
                        and associated entities, like people, vehicles, insurances
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
