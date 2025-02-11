import { useEffect, useRef } from 'react'

const CurrencyConverter = () => {
    const widgetRef = useRef(null )

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://s.fx-w.io/widgets/currency-converter/latest.js'
        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    return (
        <div>
            <div ref={widgetRef}>
                <fxwidget-cc
                    amount="1"
                    decimals="2"
                    large="false"
                    shadow="true"
                    symbol="true"
                    grouping="true"
                    border="true"
                    from="USD"
                    to="RUB"
                    background-color="#f0f8ff"
                    border-radius="0.1"
                ></fxwidget-cc> as any
            </div>
            <a href="https://currencyrate.today/">CurrencyRate</a>
        </div>
    )
}

export default CurrencyConverter
