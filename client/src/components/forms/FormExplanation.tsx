import IFormProperties from './IFormProperties.ts';

export default function FormExplanation({ title, description }: IFormProperties) {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center text-center'>
      <h1 className='w-100'>{title}</h1>

      <p className='w-75'>{description}</p>
    </div>
  );
}
