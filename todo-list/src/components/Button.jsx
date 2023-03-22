import styled from "styled-components";

const Button = styled.button`
  ${(props) => {
    // return `
    //  color: ${props.theme[props.variant].background};
    //   &:hover {
    //       color: ${props.theme[props.variant].hoverBackground}
    //   }
    // `;
    switch (props.variant) {
      case "outline":
        switch (props.color) {
          case "light":
            return `
                color: ${props.theme.light.background};
                &:hover {
                    color: ${props.theme.light.hoverBackground}
                }
            `;
          case "success":
            return `
                color: ${props.theme.success.background};
                &:hover {
                    color: ${props.theme.success.hoverBackground}
                }
            `;
          case "error":
            return `
                color: ${props.theme.error.background};
                &:hover {
                    color: ${props.theme.error.hoverBackground}
                }
            `;

          case "none":
            return `
                background-color: transparent;
            `;
          default:
            return `
                color: ${props.theme.primary.background};
            `;
        }
      default:
        switch (props.color) {
          case "light":
            return `
                    background-color: ${props.theme.light.background};
                    color: ${props.theme.light.text};
                    &:hover {
                        background-color: ${props.theme.light.hoverBackground}
                    }
                `;
          case "success":
            return `
                    background-color: ${props.theme.success.background};
                    color: ${props.theme.success.text};
                    &:hover {
                        background-color: ${props.theme.success.hoverBackground}
                    }
                `;
          case "error":
            return `
                    background-color: ${props.theme.error.background};
                    color: ${props.theme.error.text};
                    &:hover {
                        background-color: ${props.theme.error.hoverBackground}
                    }
                `;

          case "none":
            return `
                    background-color: transparent;
                `;
          default:
            return `
                    background-color: ${props.theme.primary.background};
                    color: ${props.theme.primary.text};
                `;
        }
    }
  }}
  border: none;
  border-radius: 5px;
  transition: 0.5 ease;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:disabled {
    opacity: 0.6;
  }
`;

export const IconButton = styled(Button)`
  display: block;
`;

export default Button;
