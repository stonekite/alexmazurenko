import React from "react"
import styled from "styled-components"
import { useEffect, useRef } from "react"
import PropTypes from "prop-types"

const StyledContent = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    transition: opacity 0.7s;
    opacity: 0;
    ${ ({ selected }) => selected && "opacity: 1;" }
  }
`

const StyledSection = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  padding-bottom: 1.8rem;

  &:nth-of-type(2n) {
    background-color: #fff;
    color: #000;

    ${ StyledContent } {
      background-color: #000;
      color: #fff;
    }
  }
`

const Section = ({ selected, children }) => {
  const ref = useRef(null)

  useEffect(() => {
    const scrollIntoView = () => selected && ref.current.scrollIntoView()

    scrollIntoView()
    window.addEventListener("resize", scrollIntoView)
    window.addEventListener("orientationchange", scrollIntoView)
    return () => {
      window.removeEventListener("resize", scrollIntoView)
      window.removeEventListener("orientationchange", scrollIntoView)
    }
  }, [selected])

  return (
    <StyledSection ref={ ref }>
      <StyledContent selected={ selected }>
        { children }
      </StyledContent>
    </StyledSection>
  )
}

Section.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool
}

export default Section
