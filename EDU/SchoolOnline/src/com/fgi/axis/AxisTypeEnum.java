package com.fgi.axis;

import javax.xml.namespace.QName;

public enum AxisTypeEnum {
	STRING() {
		public QName getQname() {
			return org.apache.axis.encoding.XMLType.XSD_STRING;
		}
	},
	BOOLEAN() {
		public QName getQname() {
			return org.apache.axis.encoding.XMLType.XSD_STRING;
		}
	},
	OTHER() {
		public QName getQname() {
			return org.apache.axis.encoding.XMLType.XSD_SCHEMA;
		}
	};

	AxisTypeEnum() {

	}

	public abstract QName getQname();
}
