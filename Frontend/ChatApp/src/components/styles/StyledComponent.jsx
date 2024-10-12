import { styled } from "@mui/material/styles";
import {Link as LinkComponet} from "react-router-dom";

export const VisuallyHiddeninput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkComponet)
`
  text-decoration: none;
  color: inherit;
  padding: 1rem;
  &:hover {
    text-decoration: underline;
    background-color: #f5f5f5;
  }

`;

export const InputBox = styled("input")
`
  width: 100%;
  height : 100%;
  padding: 0.5rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
  &:focus {
    border: 1px solid #333;
  }
`;
  export const Searchfield = styled("input")
` 
  width: 30vmax;
  padding: .7rem;
  border-radius: 1.5rem;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1.1rem;
  background-color: #f5f5f5;
  
`;
export const CurveButton = styled("button")
`
  padding: .8rem 1.5rem;
  border-radius: 1.5rem;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  outline: none;
  &:hover {
    background-color: #555;
  }
`;


