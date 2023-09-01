/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '90vh'
  },
  header: {
    fontSize: '36pt',
    fontWeight: 'bold'
  },
  section: {
    margin: 50,
    padding: 30,
    alignItems: 'center'
  },
  text: {
    fontSize: '12pt',
    paddingTop: '10px'
  }
})
export const Certificade = ({ name }) => (
  <Document style={{ width: '100%', display: 'block' }}>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.section}>
        <Text style={styles.header}>CERTIFICADO DE PARTICIPACIÓN</Text>
        <Text
          style={(styles.text, { paddingTop: '50px', textAlign: 'center' })}
        >
          El Festival Internacional de Danza "Danzacruz 2023" se complace en
          otorgar este certificado a:
        </Text>

        <Text style={{ fontSize: '30pt', padding: '40px 0' }}>{name}</Text>

        <Text style={styles.text}>
          Por su destacada participación en el Festival Internacional de Danza
          "Danzacruz 2023" que se llevó a cabo del 5 al 8 de Octubre en la
          ciudad de Santa Cruz de la Sierra.
        </Text>
        <Text style={styles.text}>
          Este certificado se otorga en reconocimiento a su compromiso, talento
          y dedicación en el campo de la danza, que ha contribuido al éxito y
          enriquecimiento de nuestro festival.
        </Text>
        <Text style={styles.text}>
          Felicidades por su participación en este evento internacional y por
          compartir su arte con la comunidad de amantes de la danza de todo el
          mundo. Esperamos que esta experiencia haya sido enriquecedora y
          memorable.
        </Text>
        <Text style={{ marginTop: '80px', textAlign: 'center' }}>
          Adhemar Añez
        </Text>
        <Text style={{ textAlign: 'center', fontSize: '10pt' }}>
          Director General - Danzacruz 2023
        </Text>
        <Text
          style={{ textAlign: 'right', fontSize: '10pt', marginTop: '10px' }}
        >
          ¡Le deseamos éxito continuo en su carrera artística y esperamos contar
          con su participación en futuras ediciones de "Danzacruz"!
        </Text>
      </View>
    </Page>
  </Document>
)
