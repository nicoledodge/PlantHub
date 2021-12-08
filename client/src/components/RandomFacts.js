import React from 'react'
import facts from '../pages/FactsDB'

export default function RandomFacts(props) {

    const { fact, generateRandomFact } = props;
    return (
        <div className="card" >

            <div className="card-body">
                <p className="card-text">{fact.fact}</p>
                <button
                    onClick={() => { generateRandomFact(facts) }}
                    type="submit">
                    <i class="fas fa-mouse"></i> Click for Random Fact</button>
                <button
                    className="ml-3"
                    onClick={() => {
                        generateRandomFact(facts);
                        window.open('https://twitter.com/intent/tweet/?text=' + encodeURIComponent(fact.fact))
                    }}
                    type="submit"><i class="fab fa-twitter"></i> Share Fact</button>
            </div>
        </div>
    )
}