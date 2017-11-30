import React from 'react'

/**
 * Sheet
 */

const asSheet = WrappedComponent => (
	class Sheet extends React.Component {
		constructor(props) {
			super(props)
			this.debounceTimer = null
			this.state = {
				stickyTop: 0,
			}
		}

		componentDidMount() {
			window.addEventListener('resize', this.handleResize)
			this.calculateTop()
		}

		componentWillUnmount() {
			window.removeEventListener('resize', this.handleResize)
		}

		registerRef = (element) => {
			this.element = element
			this.calculateTop()
		}

		handleResize = () => {
			clearTimeout(this.ui.debounceTimer)
			this.ui.debounceTimer = setTimeout(() => {
				this.calculateTop()
			}, 250)
		}

		calculateTop = () => {
			if (!this.element) return
			this.setState({
				stickyTop: Math.min(0, window.innerHeight - this.element.offsetHeight),
			})
		}

		render() {
			const styles = {
				position: 'sticky',
				top: this.state.stickyTop,
			}

			// if (this.props.yes) console.log(this.state.percentageInView)
			return (
				<div ref={this.registerRef} style={styles}>
					<WrappedComponent
						{...this.props}
					/>
				</div>
			)
		}
	}
)

export default asSheet
