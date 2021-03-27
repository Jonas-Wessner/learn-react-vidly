// stateless functional Component
// this is a component that has not own state and therefore
// can be built as a function that receives the props as a parameter
// using it from the outside is exactly as if it was a full component extending the component class

const NavBar = ({ counters }) => {
  return (
    <nav id="navbar" className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        NavBar
      </a>
      <span className="badge badge-success">
        {counters.reduce((acc, counter) => {
          return acc + counter.value;
        }, 0)}
      </span>
    </nav>
  );
};

export default NavBar;
