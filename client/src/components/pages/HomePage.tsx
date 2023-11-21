import ImageDatabaseModel from '../../assets/image/background.png';

const HomePage = () => {
  return (
    <div
      className='d-flex flex-column container-fluid h-100 w-100'
      style={{
        backgroundImage: `url(${ImageDatabaseModel})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
      <div
        className='col-12 h-50 d-flex flex-column
             justify-content-center align-items-center text-white'
      >
        <h1
          style={{
            fontWeight: "bold",
            fontSize: 100
          }}
        >
          Crevah
        </h1>
      </div>

      <div
        className='col-12 d-flex flex-column
             justify-content-center align-items-center text-white'
      >
        <p
          className='w-25'
          style={{
            fontWeight: "bold",
            fontSize: 16
          }}
        >
          This is a web application that allows users to view and edit vehicle crashes and
          associated entities, like people, vehicles, insurances.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
