import { useId } from "react";
import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Search, X } from "lucide-react";

function ResourceSearch({
                            value,
                            onChange,
                            resultCount,
                        }: {
    value: string;
    onChange: (v: string) => void;
    resultCount: number;
}) {
    const inputId = useId();

    return (
        <Box sx={{ maxWidth: 520, mx: "auto", mt: 5 }}>
            <TextField
                id={inputId}
                type="search"
                fullWidth
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search calculators, communities, guides…"
                aria-label="Search resources"
                data-testid="input-resource-search"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={18} aria-hidden="true" />
                            </InputAdornment>
                        ),
                        endAdornment: value ? (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    aria-label="Clear search"
                                    onClick={() => onChange("")}
                                    edge="end"
                                >
                                    <X size={16} aria-hidden="true" />
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                    },
                }}
            />

            {/* Announce result count to screen readers without stealing focus */}
            <Typography
                role="status"
                aria-live="polite"
                variant="body2"
                sx={{ mt: 1.5, color: "text.secondary", minHeight: 20 }}
            >
                {value.trim()
                    ? `${resultCount} ${resultCount === 1 ? "resource" : "resources"} found`
                    : ""}
            </Typography>
        </Box>
    );
};

export default ResourceSearch;