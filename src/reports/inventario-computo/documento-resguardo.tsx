'use client';
import { Resguardo } from "@/services/api/inventario-computo/models/Resguardos";
import {
    Document,
    Page,
    View,
    Text,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

const logoIsaf = "/logo/logo-isaf-min.png";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: "Helvetica",
        lineHeight: 1.6,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 90,
        height: 70,
    },
    title: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
        marginHorizontal: 10,
    },
    date: {
        fontSize: 10,
        textAlign: "right",
        width: 100,
    },
    employeeNumber: {
        fontSize: 10,
        textAlign: "right",
        marginBottom: 15,
    },
    centeredText: {
        textAlign: "justify",
        marginBottom: 15,
    },
    table: {
        width: "100%",
        borderStyle: "solid",
        borderWidth: 0.8,
        borderColor: "#555",
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableColHeader: {
        width: "33.33%",
        borderStyle: "solid",
        borderWidth: 0.8,
        borderColor: "#555",
        padding: 5,
        textAlign: "center",
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
    },
    tableCol: {
        width: "33.33%",
        borderStyle: "solid",
        borderWidth: 0.8,
        borderColor: "#555",
        padding: 5,
        textAlign: "center",
    },
    paragraph: {
        marginBottom: 12,
        textAlign: "justify",
    },
    signatures: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 60,
    },
    signatureBlock: {
        width: "40%",
        textAlign: "center",
    },
    signatureText: {
        fontSize: 9,
        marginBottom: 25,
    },
    name: {
        fontWeight: "bold",
    },
});

export default function DocumentoResguardo({ resguardo }: { resguardo: Resguardo }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image style={styles.logo} src={logoIsaf} />
                    <Text style={styles.title}>
                        Instituto Superior de Auditoría y Fiscalización{"\n"}
                        Dirección General de Tecnologías de la Información{"\n"}
                        Resguardo de Equipo Informático
                    </Text>
                    <Text style={styles.date}>{new Date().toLocaleDateString("es-MX", { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                </View>

                <Text style={styles.employeeNumber}>Empleado No. {resguardo.empleadoId}</Text>

                <Text style={styles.centeredText}>
                    Declaro bajo protesta de decir verdad, que con esta fecha he recibido el equipo abajo descrito, para el desempeño de las labores correspondientes al puesto de: Auditor Supervisor.
                </Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Clave</Text>
                        <Text style={styles.tableColHeader}>Descripción</Text>
                        <Text style={styles.tableColHeader}>Serie</Text>
                    </View>
                    {resguardo.equipos?.map((equipo) => (
                        <View key={equipo.id} style={styles.tableRow}>
                            <Text style={styles.tableCol}>{equipo.clave}</Text>
                            <Text style={styles.tableCol}>{equipo.descripcion}</Text>
                            <Text style={styles.tableCol}>{equipo.numSerie}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.paragraph}>
                    Los bienes en resguardo quedarán bajo la responsabilidad del usuario, teniéndo éste la obligación de mantener el equipo en las condiciones en que lo recibe, en su caso, avisar al titular de Informática con toda oportunidad las eventualidades que no permitan mantener las condiciones de uso del equipo en resguardo. En caso contrario, el usuario cubrirá los gastos que ocasione la reposición o reparación de los bienes.
                </Text>

                <Text style={styles.paragraph}>
                    El equipo deberá ser presentado para su revisión a la Dirección de Tecnologías de la Información cuando así lo solicite.
                </Text>

                <Text style={styles.paragraph}>
                    Deberá en todo momento el empleado, estar apegado en su desempeño a lo previsto por el Artículo 7º, Fracción VI de la Ley general de responsabilidades administrativas.
                </Text>

                <View style={styles.signatures} wrap={false}>
                    <View style={styles.signatureBlock}>
                        <Text style={styles.signatureText}>Me comprometo al diligente cuidado:</Text>
                        <Text>_________________________</Text>
                        <Text style={styles.name}>{resguardo.empleado}</Text>
                        <Text>Usuario</Text>
                    </View>
                    <View style={styles.signatureBlock}>
                        <Text style={styles.signatureText}>Autorizado por:</Text>
                        <Text>_________________________</Text>
                        <Text style={styles.name}>{resguardo.empleado}</Text>
                        <Text>Responsable de Área</Text>
                    </View>
                </View>

            </Page>
        </Document>
    );
}
