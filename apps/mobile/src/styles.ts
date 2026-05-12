import { StyleSheet } from "react-native";

export const colors = {
  ink: "#20351f",
  muted: "#66725e",
  paper: "#fbf7ed",
  ivory: "#fffdf6",
  moss: "#557a3d",
  forest: "#172916",
  line: "#e2dac7",
  gold: "#b5964f",
  rose: "#bd7d8e",
  sky: "#9dbbd2"
};

export const styles = StyleSheet.create({
  title: {
    color: colors.ink,
    fontSize: 38,
    fontWeight: "700",
    lineHeight: 44,
    marginBottom: 8
  },
  screenTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "700"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.ivory,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#303a2a",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4
  },
  smallText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  link: {
    color: colors.moss,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12
  },
  pill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
    paddingHorizontal: 11,
    paddingVertical: 7,
    color: colors.ink,
    fontSize: 12
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 999,
    backgroundColor: colors.moss,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    marginTop: 10
  },
  primaryButtonText: {
    color: colors.ivory,
    fontWeight: "800",
    fontSize: 15
  },
  secondaryButton: {
    minHeight: 50,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.ivory,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    marginTop: 10
  },
  secondaryButtonText: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 15
  }
});
