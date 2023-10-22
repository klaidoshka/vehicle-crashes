interface IEndBarProperties {
  isFixed: boolean;
}

export default function EndBar({isFixed}: IEndBarProperties) {
  return (
      <div className={"bg-warning-subtle w-100" + (isFixed && " fixed-bottom")} style={{"height": "20px"}}>
      </div>
  );
};