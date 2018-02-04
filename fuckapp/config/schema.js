/*
 * @Author AlbertJ
 */

module.exports = {
    "required": true,
    "type": "object",
    "properties": {
        "port": {
            "minimum": 1,
            "maximum": 65535,
            "type": "number"
        },
        "serverHost": {
            "required": true,
            "type": "string"
        },
        "env": {
            "required": true,
            "type": "string"
        },
        "dbdriver": {
            "required": true,
            "type": "string"
        },
        // database settings
        "db": {
            "required": true,
            "type": "object",
            "properties": {
                "dev": {
                    "required": true,
                    "type": "object",
                    "properties": {
                        "mysql": {
                            "required": true,
                            "type": "object",
                            "properties": {
                                "driver": {
                                    "required": true,
                                    "type": "string"
                                },
                                "username": {
                                    "required": true,
                                    "type": "string"
                                },
                                "database": {
                                    "required": true,
                                    "type": "string"
                                },
                                "password": {
                                    "required": true,
                                    "type": "string"
                                },
                                "host": {
                                    "required": true,
                                    "type": "string"
                                },
                                "dialect": {
                                    "required": true,
                                    "type": "string"
                                },
                                "DBHost": {
                                    "required": true,
                                    "type": "string"
                                }
                            }
                        },
                        "mongo": {
                            "required": true,
                            "type": "object",
                            "properties": {
                                "DBHost": {
                                    "required": true,
                                    "type": "string"
                                }
                            }
                        } 
                    }
                },
                "test": {
                    "required": true,
                    "type": "object",
                    "properties": {
                        "mysql": {
                            "required": true,
                            "type": "object",
                            "properties": {
                                "driver": {
                                    "required": true,
                                    "type": "string"
                                },
                                "username": {
                                    "required": true,
                                    "type": "string"
                                },
                                "database": {
                                    "required": true,
                                    "type": "string"
                                },
                                "password": {
                                    "required": true,
                                    "type": "string"
                                },
                                "host": {
                                    "required": true,
                                    "type": "string"
                                },
                                "dialect": {
                                    "required": true,
                                    "type": "string"
                                },
                                "DBHost": {
                                    "required": true,
                                    "type": "string"
                                }
                            }
                        },
                        "mongo": {
                            "required": true,
                            "type": "object",
                            "properties": {
                                "DBHost": {
                                    "required": true,
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        // logging options
        "log_file": {
            "required": true,
            "type": "string"
        },
        "log_level": {
            "type": "string",
            "enum": ["silly", "debug", "verbose", "info", "warn", "error"]
        }
    }
};