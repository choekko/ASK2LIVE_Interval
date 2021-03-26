const initialState = "";

const authorize = (state = initialState, action) => {

  switch(action.type){
    case "superHost":
      console.log("make super HOST", action.payload);
      state = action.payload;
      return state;

    case "audience":
      state = initialState;
      return state;

    default:
      return state;
  }

}

// const Authorize = ({setAuthorize}) => {

//     return ( 
//         <>
//             <div className="button-group">
//             <button
//               id="host"
//               type="button"
//               className="btn btn-primary btn-sm"
//               onClick={() => {
//                 setAuthorize("host");
//               }}
//             >
//               Host
//             </button>
//             <button
//               id="audience"
//               type="button"
//               className="btn btn-primary btn-sm"
//               onClick={() => {
//                 setAuthorize("audience");
//               }}
//             >
//               Audience
//             </button>
//           </div>
//         </>
//     );
// }

export default authorize;