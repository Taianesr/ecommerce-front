import React, { useState, useEffect } from "react";
import "./Hero.css";

export default function Hero() {
    return (
        <header className="hero">
            <div className="hero-content">
                <img
                    src="/logo.png"
                    alt="Logo GlossyHive"
                    className="logo"
                />

                <div className="hero-text">
                    <h1>GlossyHive</h1>

                    <p className="description">
                        ✨ Bem-vindo(a) ao GlossyHive — a sua loja online de maquiagens,
                        onde a beleza encontra a praticidade. Criado para oferecer uma
                        experiência de compra fluida, segura e intuitiva.
                    </p>


                </div>
            </div>
        </header>
    );
}
