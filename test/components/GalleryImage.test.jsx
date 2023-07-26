/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import GalleryImage from "../../src/components/GalleryImage";

describe('Pruebas en <GalleryImnage />', () => {

    test('Debe de mostrar una imagen', () => {
        render( <GalleryImage src="" alt="" /> )
        expect(screen.getByRole("img")).toBeTruthy()
    })

    test('Debe de mostrar una image con el texto alternativo', () => {
        render( <GalleryImage src="" alt="test" /> )
        expect( screen.getByAltText('test') ).toBeTruthy()
    })

})