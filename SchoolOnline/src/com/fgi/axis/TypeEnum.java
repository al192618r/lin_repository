package com.fgi.axis;


public enum TypeEnum {
	SCHEMA(AxisTypeEnum.OTHER),
	STRING(AxisTypeEnum.STRING);
	AxisTypeEnum ate;
	TypeEnum(AxisTypeEnum aa){
		this.ate = aa;
	}
}
