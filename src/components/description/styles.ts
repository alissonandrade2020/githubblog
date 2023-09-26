import styled, { css } from 'styled-components'

export const DescriptionContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  margin-top: -5rem;
`

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid white;
  color: white;
  margin: 0 1em;
  padding: 0.25em 1em;
`

export const Input = styled.input`
background: transparent;
border-radius: 3px;
border: 2px solid white;
color: white;
margin: 0 1em;
padding: 0.25em 1em;
`

interface DescriptionCardProps {
  variant?: 'green'
}

export const DescriptionCard = styled.div<DescriptionCardProps>`
  background: ${(props) => props.theme['gray-750']};
  border-radius: 6px;
  padding: 4rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
    
}

  ${(props) =>
    props.variant === 'green' &&
    css`
      background: ${props.theme['green-700']};
    `}
`