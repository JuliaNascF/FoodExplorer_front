import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    
 
    min-width: 320px;
    min-height: 100%;
    width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 10.5rem auto 8rem;
    grid-template-areas:
    "header"
    "content"
    "footer";   


    overflow-y: auto;
     
    &::-webkit-scrollbar {
        width: 22px;
         
  }
    
   &::-webkit-scrollbar-thumb {
     background-color: transparent;
     border-radius: 80px;
     box-shadow: inset 0 0 0px 6px ${({ theme }) => theme.COLORS.BLUE};
     border: solid 10px transparent;
 }

 @media only screen and (max-width: 768px) {
    &::-webkit-scrollbar {
display: none;

}}
    
`;

export const Content = styled.div`
grid-area: content;
    display: flex;
    flex-direction: column;
    
    width: 100vw;
    max-width: 121.2rem;
    height: 100%;
    margin: auto;
    padding: 3.5rem 4rem;

   
    
    .button {
        display: flex;
        justify-content: center;
        margin-top: 3.2rem;
        gap: 2rem;
        white-space: nowrap;
    }

    .deleteButton {
        background: ${({ theme }) => theme.COLORS.RED};
    }
    

    @media only screen and (min-width: 768px) {
        .button {
            align-self: flex-end;
            justify-content: end;
        }
    }
`;

export const Image = styled.div`

    position: relative;
    margin: 0 3rem 3rem;
    
    > img {
        width: 18.6rem;
        height: 18.6rem;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid ${({ theme }) => theme.COLORS.BLUE};
    }
    
    > label {
        display: flex;
        align-items: center;
        justify-content: center;
        
        position: absolute;
        bottom: 0.7rem;
        right: 0.7rem;
        
        width: 4.8rem;
        height: 4.8rem;
        
        background-color: ${({ theme }) => theme.COLORS.BLUE_500};
        border-radius: 50%;
        border: 3px solid ${({ theme }) => theme.COLORS.BLUE};

        cursor: pointer;

        input {
            display: none;
        }

        svg {
            width: 2rem;
            height: 2rem;
            color: ${({ theme }) => theme.COLORS.BLUE};
        }
    }

    > label:hover {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 3.2rem;
        font-weight: 500;
        line-height: 4.5rem;
        text-align: center;
        
        margin: 2.4rem 0 2.4rem;
    }

    button:first-child {
        font-size: 2.4rem;
    }

    .header {
        justify-content: center;
        text-align: center;
    }

    

    > div p {
        margin-bottom: 0.8rem;
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
        gap: 3.2rem;
    }

    .dish {
        width: 50%;
        align-items: center;
    }

    .dishName {
        display: flex;
        gap: 3rem;
    }

    .dishIngredients {
        display: flex;
        gap: 3rem;
        justify-content: space-between;
        @media only screen and (max-width: 768px) {
          display: flex;
          flex-direction:column;
          gap:0;
  }
    }

    .dishDetails {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 5rem;
    }

    .dishCategory select {
        background: ${({ theme }) => theme.COLORS.BLUE_300};

        border-radius: 0.5rem;
        border: none;
        border: 1px solid ${({ theme }) => theme.COLORS.WHITE};

        height: 4.8rem;
        width: 100%;

        padding: 12px;

        font-size: 16px;

        line-height: 26px;

        color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    .dishImage {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        width: 25rem;

        input[type='file'] {
        display: none;
        }
        
        > label {
            display: flex;
            justify-content: center;

            padding: 1.1rem 0.5rem;
            gap: 0.5rem;
            border-radius: 0.5rem;
            border: 1px solid ${({ theme }) => theme.COLORS.WHITE};

            background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

            font-family: 'Poppins', sans-serif;
            font-size: 1.4rem;
            font-weight: 500;
            line-height: 2.4rem;

            cursor: pointer;
        }

        > label:hover {
            background-color: ${({ theme }) => theme.COLORS.BLUE};
        }

        p {
            text-align: center;
        }
    }

    .TagIngredients {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        
        height: auto;
        gap: 2.4rem;
        padding: 0.8rem;
        
        border-radius: 0.8rem;
        margin-bottom: 3.2rem;
        border: 1px solid ${({ theme }) => theme.COLORS.WHITE};
    }

    .ingredients { 
        justify-content: space-between;
    }

    .price {
        max-width: 24rem;
        @media only screen and (max-width: 768px) {
          margin-bottom:3rem;
     
  }
    }

    @media only screen and (min-width: 768px) {

        h1 {
            text-align: left;
        }

        .dishImage {
            max-width: 22.9rem;
        }

        .dish {
            max-width: 85.9rem;
            width: 100%;
        }

        > .details {
            flex-direction: row;
            align-items: flex-start;
        }

        .TagIngredients {
            display: flex;
            flex-wrap: wrap;
            align-content: center;
            

            max-width: 83.7rem;
            width: 100%;
            height: auto;
            padding: 0.8rem;
            margin-bottom: 0;

            border-radius: 0.8rem;
            border: 1px solid ${({ theme }) => theme.COLORS.WHITE};
        }

        .ingredients { 
            display: flex;
            justify-content: space-between;
            gap: 3.2rem;
        }

        .price {
            width: 100%;
        }
    }
`;